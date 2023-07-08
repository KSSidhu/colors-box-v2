import {
    DndContext,
    DragEndEvent,
    DragStartEvent,
    MouseSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import DraggableColorBox from './DraggableColorBox'
import { NewColor } from './PaletteForm'

interface DraggableColorListProps {
    colors: NewColor[]
    deleteColor: (colorName: string) => void
    handleDragCancel: () => void
    handleDragEnd: (event: DragEndEvent) => void
    handleDragStart: (event: DragStartEvent) => void
}

export default function DraggableColorList({
    colors,
    deleteColor,
    handleDragEnd,
    handleDragCancel,
    handleDragStart,
}: DraggableColorListProps) {
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext
                items={colors.map((color) => color.name)}
                strategy={rectSortingStrategy}
            >
                <div style={{ height: '100%' }}>
                    {colors.map((color) => (
                        <DraggableColorBox
                            key={color.name}
                            color={color.color}
                            name={color.name}
                            deleteColor={() => deleteColor(color.name)}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    )
}
