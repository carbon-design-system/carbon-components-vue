export default {
  columns: [
    { label: 'Standard columns', value: ['Name', 'Protocol', 'Port', 'Rule', 'Attached Groups', 'Status'] },
    {
      label: 'Styled Headings',
      value: [
        { label: 'Name', headingStyle: { textTransform: 'uppercase' }, sortable: true },
        { label: 'Protocol', headingStyle: { textTransform: 'uppercase' } },
        {
          label: 'Port',
          headingStyle: {
            textTransform: 'uppercase',
            textAlign: 'right',
            paddingRight: '2.5rem',
          },
          dataStyle: { textAlign: 'right', paddingRight: '2.5rem' },
        },
        { label: 'Rule', headingStyle: { textTransform: 'uppercase' } },
        {
          label: 'Attached Groups',
          headingStyle: { textTransform: 'uppercase' },
        },
        { label: 'Status', headingStyle: { textTransform: 'uppercase' } },
      ],
    },
    {
      label: 'Name sortable',
      value: [{ label: 'Name', sortable: true }, 'Protocol', 'Port', 'Rule', 'Attached Groups', 'Status'],
    },
  ],

  data: [
    ['Load Balancer 11', 'HTTP', '80', 'Round Robin', 'Maureen’s VM Groups', 'Active'],
    ['Load Balancer 4', 'HTTP', '81', 'Round Robin', 'Maureen’s VM Groups', 'Active'],
    ['Load Balancer 2', 'HTTP', '82', 'Round Robin', 'Maureen’s VM Groups', 'Active'],
    ['Load Balancer 3', 'HTTP', '8080', 'Round Robin', 'Maureen’s VM Groups', 'Offline'],
    ['Load Balancer 5', 'HTTP', '8001', 'Round Robin', 'Maureen’s VM Groups', 'Active'],
    ['Load Balancer 11', 'HTTP', '10', 'Round Robin', 'Max’s VM Groups', 'Active'],
    ['Load Balancer 24', 'HTTP', '11', 'Round Robin', 'Max’s VM Groups', 'Active'],
    ['Load Balancer 22', 'HTTP', '12', 'Round Robin', 'Max’s VM Groups', 'Active'],
    ['Load Balancer 23', 'HTTP', '1080', 'Round Robin', 'Max’s VM Groups', 'Active'],
    ['Load Balancer 25', 'HTTP', '1001', 'Round Robin', 'Max’s VM Groups', 'Failed'],
    ['Load Balancer 311', 'HTTP', '280', 'Round Robin', 'John’s VM Groups', 'Active'],
    ['Load Balancer 324', 'HTTP', '281', 'Round Robin', 'John’s VM Groups', 'Active'],
    ['Load Balancer 322', 'HTTP', '282', 'Round Robin', 'John’s VM Groups', 'Offline'],
    ['Load Balancer 323', 'HTTP', '2080', 'Round Robin', 'John’s VM Groups', 'Active'],
    ['Load Balancer 325', 'HTTP', '2001', 'Round Robin', 'John’s VM Groups', 'Active'],
  ],
  pagination: [
    { label: 'false or undefined', value: false },
    { label: 'true', value: true },
    { label: 'Number of items specified', value: { numberOfItems: 15 } },
    { label: 'Custom pagination settings', value: { numberOfItems: 23, pageSizes: [5, 10, 15, 20, 25] } },
    { label: 'Infinite pagination', value: { numberOfItems: Infinity, pageSizes: [5, 10, 15, 20, 25] } },
  ],
};
