import { BaseScreen } from "@/core/component/base-screen.component"

export class NotFound extends BaseScreen {
    constructor() {
      super({ title: 'Not found' })
    }
  render() {
    return '<p>Not found!</p>'
  }
}