import React, { useState } from 'react';

import Line from '../Line/Line';
import { TLines } from '@/types/line';
import { TPosition } from '@/types/position';

import classes from './main.module.scss';

const Main = () => {
  const [linesArrayState, setLinesArrayState] = useState<TLines[]>([
    {
      title: 'To Do',
      color: 'blue',
      counter: 3,
      tasks: ['aaaa', 'bbb', 'ccc'],
    },
    { title: 'In Progress', color: 'red', counter: 1, tasks: ['niki'] },
    { title: 'Testing', color: 'green', counter: 0, tasks: [] },
    { title: 'Done', color: 'black', counter: 0, tasks: [] },
  ]);

  const [draggedItemState, setDraggedItemState] = useState<TPosition | null>(
    null
  );

  const handleCurrentDragItem = (position: TPosition) => {
    setDraggedItemState({
      lineIndex: position.lineIndex,
      itemIndex: position.itemIndex,
    });
  };

  function onClickAddTask() {
    setLinesArrayState((prevLineArray) => {
      const updatedLineArray = [...prevLineArray];
      updatedLineArray[0] = {
        ...updatedLineArray[0],
        tasks: [...updatedLineArray[0].tasks, ''],
      };

      updatedLineArray[0].counter = updatedLineArray[0].tasks.length;

      return updatedLineArray;
    });
  }

  const setList = (list: TLines[]) => {
    setLinesArrayState(() => list);
  };

  const handleChange = (
    lineIndex: number,
    itemIndex: number,
    value: string
  ) => {
    setLinesArrayState((prevLineArray) => {
      const updatedLineArray = [...prevLineArray];
      updatedLineArray[lineIndex].tasks[itemIndex] = value;
      return updatedLineArray;
    });
  };

  return (
    <div className={classes['container']}>
      <div className={classes['linesContainer']}>
        {linesArrayState &&
          linesArrayState.map((line, lineIndex) => (
            <Line
              key={line.title + lineIndex}
              title={line.title}
              color={line.color}
              lineIndex={lineIndex}
              counter={line.counter}
              tasks={line.tasks}
              lineArray={linesArrayState}
              draggedItem={draggedItemState}
              setList={setList}
              handleChange={handleChange}
              handleCurrentDragItem={handleCurrentDragItem}
            />
          ))}
      </div>

      <button
        className={classes['container__button']}
        onClick={() => onClickAddTask()}
      >
        + Add
      </button>
    </div>
  );
};

const MemoizedMain = React.memo(Main);

export default MemoizedMain;
