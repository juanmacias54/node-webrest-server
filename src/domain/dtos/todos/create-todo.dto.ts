


export class CreateTodoDto {


    private constructor(
        public readonly name: string) { }

    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {

        const { text } = props;
        if (!text) {
            return ['text property is required', undefined];
        }

        return [undefined, new CreateTodoDto(text)]
    }
}



