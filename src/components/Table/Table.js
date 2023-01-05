import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/Table/table.template";
import {tableResizeHandler} from "@/components/Table/table.resize";
import {shouldResize} from "@/components/Table/table.function";

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });

  }

  toHTML() {
    return createTable(30)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(this.$root, event)
    }
  }
}