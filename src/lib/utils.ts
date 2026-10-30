export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("hi-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("hi-IN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatTimeAgo(dateInput?: string | Date | null, fallback = "Just now"): string {
  if (!dateInput) return fallback;
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return fallback;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  if (diffMs < 0 || diffMs < 60 * 1000) {
    return "Just now";
  }

  const diffMins = Math.floor(diffMs / (60 * 1000));
  if (diffMins < 60) {
    return `${diffMins}m ago`;
  }

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function getTodayFormattedDate(): string {
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
  const day = now.getDate();
  const monthName = now.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
  const year = now.getFullYear();
  return `${dayName}, ${day} ${monthName} ${year}`;
}

export function formatViews(views: number): string {
  if (views >= 100000) return `${(views / 100000).toFixed(1)}L`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + "...";
}
