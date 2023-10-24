import React from 'react';

import Task from '../Task/Task';
import { TPosition } from '@/types/position';
import { TLines } from '@/types/line';

import classes from './Line.module.scss';

interface IProps {
  readonly title: string;
  readonly counter: number;
  readonly color: string;
  readonly tasks: string[];
  readonly lineIndex: number;
  readonly lineArray: TLines[];
  readonly draggedItem: TPosition;
  readonly setList: (list: TLines[]) => void;
  readonly handleChange: (
    lineIndex: number,
    itemIndex: number,
    value: string
  ) => void;
  readonly handleCurrentDragItem: (position: TPosition) => void;
}

const Line = (props: IProps) => {
  const updateCounter = (array, currentLineIndex, targetLineIndex) => {
    array[currentLineIndex].counter = array[currentLineIndex].tasks.length;
    array[targetLineIndex].counter = array[targetLineIndex].tasks.length;

    return array;
  };

  const handleDragEnter = (targetItem: TPosition) => {
    if (
      props.draggedItem.lineIndex !== targetItem.lineIndex ||
      props.draggedItem.itemIndex !== targetItem.itemIndex
    ) {
      const newList: TLines[] = JSON.parse(JSON.stringify(props.lineArray));
      const draggedTask =
        newList[props.draggedItem.lineIndex].tasks[props.draggedItem.itemIndex];

      newList[props.draggedItem.lineIndex].tasks.splice(
        props.draggedItem.itemIndex,
        1
      );

      newList[targetItem.lineIndex].tasks.splice(
        targetItem.itemIndex,
        0,
        draggedTask
      );

      props.handleCurrentDragItem({
        lineIndex: targetItem.lineIndex,
        itemIndex: targetItem.itemIndex,
      });

      updateCounter(newList, props.draggedItem.lineIndex, targetItem.lineIndex);

      props.setList(newList);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      style={{ backgroundColor: `${props.color}` }}
      className={classes['container']}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={
        props.tasks.length === 0
          ? () => handleDragEnter({ lineIndex: props.lineIndex, itemIndex: 0 })
          : null
      }
    >
      <div className={classes['container__title']}>
        <span>{props.title + ' / '}</span>
        <span>{props.counter}</span>
      </div>

      {props.tasks &&
        props.tasks.map((task, itemI) => (
          <Task
            key={task + itemI}
            itemIndex={itemI}
            lineIndex={props.lineIndex}
            linesArray={props.lineArray}
            handleDragEnter={handleDragEnter}
            handleChange={props.handleChange}
            handleCurrentDragItem={props.handleCurrentDragItem}
          />
        ))}
    </div>
  );
};

const MemoizedLine = React.memo(Line);

export default MemoizedLine;
