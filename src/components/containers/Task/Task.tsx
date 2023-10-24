import React, { useState } from 'react';

import { TLines } from '@/types/line';
import { TPosition } from '@/types/position';

import classes from './Task.module.scss';

interface IProps {
  readonly itemIndex: number;
  readonly lineIndex: number;
  readonly linesArray: TLines[];
  readonly handleDragEnter: (position: TPosition) => void;
  readonly handleChange: (
    lineIndex: number,
    itemIndex: number,
    value: string
  ) => void;
  readonly handleCurrentDragItem: (position: TPosition) => void;
}

const Task = (props: IProps) => {
  const [inputValue, setInputValue] = useState(
    props.linesArray[props.lineIndex].tasks[props.itemIndex]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);

    props.handleChange(props.lineIndex, props.itemIndex, value);
  };

  const handletDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    position: TPosition
  ) => {
    props.handleCurrentDragItem({
      lineIndex: position.lineIndex,
      itemIndex: position.itemIndex,
    });
  };

  return (
    <div
      className={classes['container']}
      draggable
      onDragStart={(e) =>
        handletDragStart(e, {
          lineIndex: props.lineIndex,
          itemIndex: props.itemIndex,
        })
      }
      onDragEnter={() => {
        props.handleDragEnter({
          lineIndex: props.lineIndex,
          itemIndex: props.itemIndex,
        });
      }}
    >
      <input
        autoFocus
        value={inputValue}
        className={classes['container__text']}
        onChange={handleChange}
      />
    </div>
  );
};

const MemoizedTask = React.memo(Task);

export default MemoizedTask;
