export class AppError extends Error {
  private status:number

  constructor(o:{ message:string, status:number }) {
    super(o.message)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AppError.prototype)

    this.status = o.status
    this.message = o.message
  }

  getObject () {
    return {
      status: `${this.status}`,
      title: this.message
    }
  }

  getStatus () {
    return this.status
  }
}
