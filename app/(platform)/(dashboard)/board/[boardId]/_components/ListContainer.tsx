"use client"

import { ListWithCards } from "@/types";
import ListForm from "./ListForm";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import { set } from "zod";

interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  console.log(removed)
  result.splice(endIndex, 0, removed);

  return result;
}

const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  const [sortedLists, setSortedLists] = useState<ListWithCards[]>(lists);

  useEffect(() => {
    setSortedLists(lists)
  }, [lists])

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === "list") {
      const newLists = reorder(sortedLists, source.index, destination.index).map((list, index) => ({ ...list, column: index }));
      setSortedLists(newLists);
      //ToDO: Update rows
      //TODO: hidden ListForm while dragging
    }

    if (type === "card") {
      let newSortedLists = [...sortedLists];

      const sourceList = newSortedLists.find(list => list.id === source.droppableId);
      const destinationList = newSortedLists.find(list => list.id === destination.droppableId);

      if (!sourceList || !destinationList) return;

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      if (source.droppableId === destination.droppableId) {
        console.log(source.index, destination.index);
        const reorderedCards = reorder(sourceList.cards, source.index, destination.index)
        console.log(source.index, destination.index);

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = reorderedCards;

        //setSortedLists(newSortedLists);
      } else {

        const [movedCard] = sourceList.cards.splice(source.index, 1);

        movedCard.listId = destination.droppableId;

        destinationList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        })

        destinationList.cards.forEach((card, idx) => {
          card.order = idx;
        })

        //setSortedLists(newSortedLists);
      }
      setSortedLists(newSortedLists);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction="horizontal" droppableId="lists" type="list">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex overflow-x-auto gap-x-5 h-full"
          >
            {sortedLists.map((list, index) => (
                <ListItem
                  key={list.id}
                  index={index}
                  list={list}
                  boardId={boardId} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flez shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}



export default ListContainer

{/* <ol className="flex flex-col shrink-0" key={list.id} >
                <ListItem
                  key={list.id}
                  index={index}
                  list={list}
                  boardId={boardId} />
                <ListForm /> 
              </ol> */}