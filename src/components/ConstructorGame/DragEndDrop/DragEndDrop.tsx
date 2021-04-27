import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { updateCharsPosition } from '../../../actions/constructor-game-actions';
import { RootStateType } from '../../../reducer/root-reducer';
import styles from './DragEndDrop.module.css';

export const DragEndDrop: React.FC = () => {
  const dispatch = useDispatch();

  const chars = useSelector(
    (state: RootStateType) => state.constructorGameState.chars
  );

  function updateCharsPositionHandler(result: any) {
    if (!result.destination) {
      return;
    }

    const items = Array.from(chars);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(updateCharsPosition(items));
  }

  return chars !== undefined ? (
    <DragDropContext onDragEnd={updateCharsPositionHandler}>
      <Droppable droppableId="chars" direction="horizontal">
        {(provided: any) => (
          <ul
            className={`${styles.word__wrapper} chars`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {chars.map((char, index) => (
              <Draggable key={char[0]} draggableId={char[0]} index={index}>
                {(providedInner: any) => (
                  <li
                    key={char[0]}
                    className={styles.word__char}
                    ref={providedInner.innerRef}
                    {...providedInner.draggableProps}
                    {...providedInner.dragHandleProps}
                  >
                    {char[1]}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
};
