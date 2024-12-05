"use client"

import { Draggable } from "@hello-pangea/dnd";
import { CardModel } from "@prisma/client";

interface CardItemProps {
    index: number;
    card: CardModel
}

const CardItem = ({ card, index }: CardItemProps) => {
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                   
                    role="button"
                    className="truncate border-2 border-transparent hover:border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm transition">
                    {card.title}
                </div>
            )}
        </Draggable>
    )
}

export default CardItem