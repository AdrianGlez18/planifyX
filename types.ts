import { CardModel, ListModel } from "@prisma/client"

export type ListWithCards = ListModel & {
    cards: CardModel[]
}
export type CardWithList = CardModel & {
    list: ListModel
}