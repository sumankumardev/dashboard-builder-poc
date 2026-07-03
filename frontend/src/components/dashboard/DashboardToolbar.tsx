import { WIDGET_CATALOG }
from "../../constants/widgetCatalog";

export default function DashboardToolbar() {

  return (
    <div className="flex gap-3 mb-4">

      {WIDGET_CATALOG.map(
        widget => (

          <button
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            key={widget.type}
          >
            Add {widget.title}
          </button>

        )
      )}

    </div>
  );
}