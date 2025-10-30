import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { Plus } from 'lucide-react';
import PostCardCalendar from './PostCardCalendar';

const TimeSlotCell = ({ 
  date, 
  time, 
  postsInSlot, 
  onAddPostClick, 
  onPostCardClick,
  platformDetails, 
  statusColors,
  isToday,
  themeColors,
  handleMovePost // Receive handleMovePost
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.POST_CARD,
    drop: (item) => {
      // Check if the item is dropped on a different slot (date or time)
      if (item.originalDate !== date || item.originalTime !== time) {
        handleMovePost(item.id, date, time);
      }
    },
    canDrop: (item) => item.originalDate !== date || item.originalTime !== time, // Allow drop if different slot
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  let hoverBgClass = 'hover:bg-gray-100/70 dark:hover:bg-gray-700/50';
  if (isToday) {
    hoverBgClass = `hover:bg-[${themeColors.primary}]/20 dark:hover:bg-[${themeColors.primary}]/25`;
  }
  if (isOver && canDrop) {
    hoverBgClass = 'bg-green-100/50 dark:bg-green-900/30';
  }

  return (
    <div
      ref={drop}
      className={`min-h-[4rem] border-b border-gray-200 dark:border-gray-700 p-1.5 relative group 
                  ${hoverBgClass}
                  transition-colors duration-150 flex flex-col`}
      onClick={(e) => {
        if (e.target === e.currentTarget || e.target.classList.contains('add-post-btn-slot') || e.target.closest('.add-post-btn-slot')) {
          if (postsInSlot.length === 0) {
             onAddPostClick(date, time);
          }
        }
      }}
    >
      <div className="flex flex-col gap-1"> 
        {postsInSlot.map(post => (
          <PostCardCalendar
            key={post.id}
            post={post}
            platformDetails={platformDetails}
            statusColors={statusColors}
            onPreviewClick={onPostCardClick}
          />
        ))}
      </div>
      {postsInSlot.length === 0 && (
        <button 
          className="add-post-btn-slot absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-theme-primary dark:hover:text-theme-accent"
          title={`Add post for ${time}`}
          onClick={(e) => { e.stopPropagation(); onAddPostClick(date, time); }}
        >
          <Plus size={20} />
        </button>
      )}
    </div>
  );
};

export default TimeSlotCell;
