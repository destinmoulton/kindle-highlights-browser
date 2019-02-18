import * as React from "react";
import { render } from "react-dom";

import {
    SortableContainer,
    SortableElement,
    arrayMove
} from "react-sortable-hoc";
import * as Types from "../../../types";

const SortableItem = SortableElement(({ value }: { value: string }) => (
    <div className="khb-csvsort-list-item">{value}</div>
));

const SortableList = SortableContainer(({ items }: SortableItems) => {
    return (
        <div className="khb-csvsort-list-container">
            {items.map((item: Types.CSVColumn, index: number) => (
                <SortableItem
                    key={`item-${index}`}
                    index={index}
                    value={item.name}
                />
            ))}
        </div>
    );
});

interface Props {
    columns: Types.CSVColumn[];
    onSortEnd: ({
        oldIndex,
        newIndex
    }: {
        oldIndex: number;
        newIndex: number;
    }) => void;
}
interface SortableItems {
    items: Types.CSVColumn[];
}

const ColumnReorder = (props: Props) => {
    const { columns, onSortEnd } = props;
    return <SortableList axis="x" items={columns} onSortEnd={onSortEnd} />;
};

export default ColumnReorder;
