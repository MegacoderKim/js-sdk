import {IActionsTrendlineConfig} from "../../interfaces/trendline";
import {IActionStatusGraph} from "ht-models";
import {DateRangeMap} from "ht-data";
import {ActionsStatusGraphService} from "../../actions-status-graph/actions-status-graph.service";

export interface IActionsConfigPreset {
  [name: string]: {
    service: any,
    initialConfig: IActionsTrendlineConfig
  }
}
export const actionsConfigPreset: IActionsConfigPreset = {
  "status": {
    service: ActionsStatusGraphService,
    initialConfig: {
      title: "Actions status chart",
      initialDateRange: DateRangeMap.last_30_days,
      tags: [],
      chartFormat: [
        {
          title: "Completed",
          selector(graphData: IActionStatusGraph) {
            return graphData.completed
          }
        },
        {
          title: "Assigned",
          selector(graphData: IActionStatusGraph) {
            return graphData.assigned
          }
        }

      ]
    }
  }
};
