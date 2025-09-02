import { format, isAfter, isBefore, startOfDay, addDays, differenceInDays, nextFriday, isToday } from "date-fns";

export const formatDate = (date, formatString = "dd MMM yyyy") => {
  if (!date) return "";
  return format(new Date(date), formatString);
};

export const formatDateTime = (date) => {
  if (!date) return "";
  return format(new Date(date), "dd MMM yyyy 'at' h:mm a");
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return isBefore(new Date(dueDate), startOfDay(new Date()));
};

export const getDueDateStatus = (dueDate) => {
  if (!dueDate) return "unknown";
  
  const today = startOfDay(new Date());
  const due = startOfDay(new Date(dueDate));
  
  if (isBefore(due, today)) return "overdue";
  if (isToday(due)) return "due-today";
  
  const daysUntilDue = differenceInDays(due, today);
  if (daysUntilDue <= 7) return "due-soon";
  
  return "future";
};

export const getNextFridayDate = () => {
  const today = new Date();
  return nextFriday(today);
};

export const getDaysUntilFriday = () => {
  const today = new Date();
  const friday = nextFriday(today);
  return differenceInDays(friday, today);
};

export const formatRelativeDate = (date) => {
  if (!date) return "";
  
  const today = startOfDay(new Date());
  const targetDate = startOfDay(new Date(date));
  const daysDiff = differenceInDays(targetDate, today);
  
  if (daysDiff === 0) return "Today";
  if (daysDiff === 1) return "Tomorrow";
  if (daysDiff === -1) return "Yesterday";
  if (daysDiff > 0) return `In ${daysDiff} days`;
  return `${Math.abs(daysDiff)} days ago`;
};

export const isFridayToday = () => {
  return new Date().getDay() === 5;
};