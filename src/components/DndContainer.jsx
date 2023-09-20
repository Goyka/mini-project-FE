"use client";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import "@atlaskit/css-reset";

const DndContainer = ({ kanban, setKanban }) => {
  const handleChange = (result) => {
    if (!result.destination) return;
    const items = [...kanban];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setKanban(items);
  };
  return (
    <DragDropContext onDragEnd={handleChange}>
      <Droppable droppableId="cardlists">
        {(provided) => (
          <div
            className="cardlists"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {post.map((e, i) => (
              <Draggable
                draggableId={`test-${e.id}`}
                index={i}
                key={`test-${e.id}`}
              >
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <h3>{e.id}</h3>
                      <EditorComponent isDragging={snapshot.isDragging} />
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default DndContainer;
