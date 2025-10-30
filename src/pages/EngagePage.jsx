import React, { useState } from 'react';
import { LayoutList, CalendarDays } from 'lucide-react';
import ContentScheduler from './ContentScheduler'; // Assuming ContentScheduler is now a component
import CalendarViewPage from './CalendarViewPage'; // Assuming CalendarViewPage is now a component
import { DndProvider } from 'react-dnd'; // Import DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend'; // Import HTML5Backend

const EngagePage = () => {
  const [activeView, setActiveView] = useState('list'); // 'list' or 'calendar'

  return (
    <div className="max-w-full mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Engage</h1>
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => setActiveView('list')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${activeView === 'list' 
                ? 'bg-theme-primary text-white shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            <LayoutList className="w-4 h-4" />
            List View
          </button>
          <button
            onClick={() => setActiveView('calendar')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${activeView === 'calendar' 
                ? 'bg-theme-primary text-white shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            <CalendarDays className="w-4 h-4" />
            Calendar View
          </button>
        </div>
      </div>

      {activeView === 'list' && (
        <ContentScheduler isEmbedded={true} />
      )}
      
      {activeView === 'calendar' && (
        // Wrap CalendarViewPage with DndProvider here if it's not already wrapped internally
        // and if it uses react-dnd directly as a page-level component.
        // If CalendarViewPage itself sets up DndProvider, this might not be needed here.
        // Based on previous CalendarViewPage, it sets up its own DndProvider.
        <DndProvider backend={HTML5Backend}>
           <CalendarViewPage isEmbedded={true} />
        </DndProvider>
      )}
    </div>
  );
};

export default EngagePage;
