
import React from 'react';

const TestingPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="bg-white/20 p-4 rounded-md overflow-auto">
        <h3 className="text-sm font-medium mb-2">Test Input</h3>
        <pre className="p-2 bg-white/30 rounded-md h-[400px] overflow-auto whitespace-pre-wrap">
          {`{
  "document": {
    "type": "invoice",
    "content": "Sample content for workflow testing",
    "metadata": {
      "source": "upload",
      "date": "2023-07-15",
      "customer": "Acme Inc."
    }
  }
}`}
        </pre>
      </div>
      <div className="bg-white/20 p-4 rounded-md overflow-auto">
        <h3 className="text-sm font-medium mb-2">Test Output</h3>
        <pre className="p-2 bg-white/30 rounded-md h-[400px] overflow-auto whitespace-pre-wrap">
          {`{
  "results": {
    "extracted_data": {
      "invoice_number": "INV-2023-0042",
      "amount": 1250.00,
      "date": "2023-07-15",
      "customer": "Acme Inc."
    },
    "confidence_score": 0.92,
    "processing_time": "1.24s"
  },
  "status": "success"
}`}
        </pre>
      </div>
    </div>
  );
};

export default TestingPanel;
