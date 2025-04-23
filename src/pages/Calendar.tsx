import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import ComicPanel from '../components/ComicPanel';
import { useStreakStore } from '../store/useStreakStore';
import { ChevronLeft, ChevronRight, Check, X, PenLine } from 'lucide-react';

const Calendar: React.FC = () => {
  const { history, addJournalEntry } = useStreakStore();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [journalEntry, setJournalEntry] = useState('');
  
  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  
  // Create calendar grid
  const calendarDays = [];
  let day = startDate;
  
  while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, 'day')) {
    calendarDays.push(day);
    day = day.add(1, 'day');
    
    // Break if we're in the next month and completed a week
    if (day.isAfter(endOfMonth) && day.day() === 0) break;
  }
  
  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };
  
  const handleDateClick = (date: dayjs.Dayjs) => {
    const formatDate = date.format('YYYY-MM-DD');
    setSelectedDate(formatDate);
    setJournalEntry(history[formatDate]?.journalEntry || '');
  };
  
  const handleSaveJournal = () => {
    if (selectedDate) {
      addJournalEntry(selectedDate, journalEntry);
      setSelectedDate(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <header className="text-center">
        <motion.h1 
          className="font-bangers text-4xl md:text-6xl text-secondary mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          YOUR PROGRESS CALENDAR
        </motion.h1>
        <p className="font-comic text-xl text-comic-black">
          Track your journey day by day
        </p>
      </header>
      
      <ComicPanel className="bg-comic-white p-6">
        <div className="flex justify-between items-center mb-6">
          <button 
            className="comic-btn bg-secondary"
            onClick={handlePrevMonth}
          >
            <ChevronLeft size={24} />
          </button>
          
          <h2 className="font-bangers text-3xl text-comic-black">
            {currentMonth.format('MMMM YYYY')}
          </h2>
          
          <button 
            className="comic-btn bg-secondary"
            onClick={handleNextMonth}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div 
              key={day} 
              className="font-bangers text-center py-2 text-comic-black"
            >
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const formattedDate = day.format('YYYY-MM-DD');
            const dayRecord = history[formattedDate];
            const isCurrentMonth = day.month() === currentMonth.month();
            const isToday = day.isSame(dayjs(), 'day');
            const hasJournal = dayRecord?.journalEntry;
            
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDateClick(day)}
                className={`
                  aspect-square flex flex-col items-center justify-center p-1 rounded-lg border-2 
                  cursor-pointer relative
                  ${isCurrentMonth ? 'border-comic-black' : 'border-comic-gray-300'}
                  ${isToday ? 'bg-accent bg-opacity-30' : ''}
                  ${dayRecord?.success === true ? 'bg-secondary bg-opacity-20' : ''}
                  ${dayRecord?.success === false ? 'bg-primary bg-opacity-20' : ''}
                `}
              >
                <span className={`
                  font-comic font-bold text-lg
                  ${isCurrentMonth ? 'text-comic-black' : 'text-comic-gray-400'}
                `}>
                  {day.date()}
                </span>
                
                {dayRecord?.success === true && (
                  <Check size={18} className="text-secondary absolute bottom-1 right-1" />
                )}
                
                {dayRecord?.success === false && (
                  <X size={18} className="text-primary absolute bottom-1 right-1" />
                )}
                
                {hasJournal && (
                  <PenLine size={16} className="absolute bottom-1 left-1 text-comic-black" />
                )}
              </motion.div>
            );
          })}
        </div>
      </ComicPanel>
      
      {/* Journal Entry Modal */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-comic-black bg-opacity-70"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="comic-panel w-11/12 max-w-2xl m-4 p-5 bg-comic-white"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bangers text-2xl text-secondary">
                Journal Entry: {dayjs(selectedDate).format('MMMM D, YYYY')}
              </h3>
              <button
                onClick={() => setSelectedDate(null)}
                className="bg-comic-gray-200 rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="w-full h-64 p-4 border-2 border-comic-black rounded-lg font-comic text-lg mb-4"
              placeholder="How are you feeling today? Any victories or challenges to note?"
            />
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedDate(null)}
                className="font-bangers py-2 px-6 bg-comic-gray-200 rounded-lg border-2 border-comic-black"
              >
                CANCEL
              </button>
              <button 
                onClick={handleSaveJournal}
                className="comic-btn bg-secondary"
              >
                SAVE ENTRY
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Calendar;