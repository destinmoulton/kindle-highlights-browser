import * as React from "react";
import { render } from "react-dom";

import {
    SortableContainer,
    SortableElement,
    arrayMove
} from "react-sortable-hoc";

const SortableItem = SortableElement(({ value }: { value: string }) => (
    <li>{value}</li>
));

const SortableList = SortableContainer(({ items }: SortableItems) => {
    return (
        <ul>
            {items.map((item: ClipColumn, index: number) => (
                <SortableItem
                    key={`item-${index}`}
                    index={index}
                    value={item.name}
                />
            ))}
        </ul>
    );
});

interface ClipColumn {
    key: string;
    name: string;
}

interface Props {}
interface SortableItems {
    items: ClipColumn[];
}

const ClipColumns: ClipColumn[] = [
    { key: "title", name: "Title" },
    { key: "authorFullName", name: "Author" },
    { key: "location", name: "Location" },
    { key: "text", name: "Text" }
];

class SortableComponent extends React.Component<Props, SortableItems> {
    constructor(props: Props) {
        super(props);

        this.state = {
            items: ClipColumns
        };
    }

    onSortEnd = ({
        oldIndex,
        newIndex
    }: {
        oldIndex: number;
        newIndex: number;
    }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex)
        }));
    };

    render() {
        return (
            <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
        );
    }
}

render(<SortableComponent />, document.getElementById("root"));
