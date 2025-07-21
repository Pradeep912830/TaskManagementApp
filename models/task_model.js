export default class Task {
  constructor({
    id = null,
    title = '',
    description = '',
    dueDate = '',
    priority = 'low',
    isCompleted = false,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = isCompleted;
  }

  toJSON() {
    return {
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      isCompleted: this.isCompleted,
    };
  }

  static fromJSON(id, json) {
    return new Task({
      id,
      title: json.title ?? '',
      description: json.description ?? '',
      dueDate: json.dueDate ?? '',
      priority: json.priority ?? 'low',
      isCompleted: json.isCompleted ?? false,
    });
  }
}
