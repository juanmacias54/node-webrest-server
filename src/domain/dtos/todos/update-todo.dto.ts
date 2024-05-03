export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly name?: string,
        public readonly createdAt?: Date
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {}
        if (this.name)
            returnObj.name = this.name
        if (this.createdAt)
            returnObj.createdAt = this.createdAt
        console.log("aca--->4", returnObj)
        return returnObj
    }

    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {

        const { id, text, createdAt } = props;
        let newCreatedAt = createdAt

        if (!id || isNaN(Number(id))) return ['id must be a number']

        if (createdAt) {
            newCreatedAt = new Date(createdAt)
            if (newCreatedAt.toString() === 'Invalid Date')
                return ['createdAt property must be a valid date'];
        }

        return [undefined, new UpdateTodoDto(id, text, createdAt)]
    }
}
