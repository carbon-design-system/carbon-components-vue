import { render } from '@testing-library/vue';
import CvDataTable from '../CvDataTable.vue';
import CvDataTableHeading from '../CvDataTableHeading.vue';
import CvDataTableRow from '../CvDataTableRow.vue';
import CvDataTableCell from '../CvDataTableCell.vue';
import CvDataTableAction from '../CvDataTableAction.vue';
import CvDataTableSkeleton from '../CvDataTableSkeleton.vue';
import CvButton from '../../CvButton/CvButton.vue';
import { Terminal16 as CompileIcon } from '@carbon/icons-vue';

// prettier-ignore
const testData = [
  { name:"Java", year:1995, oo:"Yes", purpose:"Applications", standard:"Java Language Specification", desc: "As of September 2022, Java 19 is the latest version, while Java 17, 11 and 8 are the current long-term support (LTS) versions."},
  { name:"COBOL", year:1959, oo:"Yes", purpose:"Business applications", standard:"COBOL 2014", desc: "COBOL statements have an English-like syntax, which was designed to be self-documenting and highly readable."},
  { name:"Pascal", year:1970, oo:"No", purpose:"Applications", standard:"None", desc: "Pascal was developed on the pattern of the ALGOL 60 language."},
  { name:"Ada", year:1980, oo:"Yes", purpose:"US DoD projects", standard:"Ada 2012 TC1", desc: "Ada was named after Ada Lovelace (1815–1852), who has been credited as the first computer programmer."},
  { name:"BASIC", year:1964, oo:"No", purpose:"Education", standard:"ANSI", desc: "BASIC declined in popularity in the 1990s"},
  { name:"C++", year:1985, oo:"Yes", purpose:"Systems programming", standard:"ISO/IEC 2017", desc: "C++ is standardized by the International Organization for Standardization (ISO), with the latest standard version ratified and published by ISO in December 2020 as ISO/IEC 14882:2020 (informally known as C++20)."},
  { name:"Fortran", year:1957, oo:"No", purpose:"Engineering applications", standard:"ANSI", desc: "Fortran was originally developed by IBM in the 1950s for scientific and engineering applications, and subsequently came to dominate scientific computing."},
  { name:"Go", year:2009, oo:"Maybe", purpose:"Networked applications", standard:"Go Spec", desc: "Go's designers were primarily motivated by their shared dislike of C++."},
];

const batchActionsSlot = {
  components: { CvButton },
  template: `<cv-button>Delete</cv-button>`,
};

const actionsSlot = {
  components: { CvDataTableAction, CompileIcon },
  template: `
    <cv-data-table-action aria-label="compile" alt="compile">
      <compile-icon>
        <title>Compile</title>
      </compile-icon>
    </cv-data-table-action>
    `,
};

const headingsSlot = {
  components: { CvDataTableHeading },
  template: `
    <cv-data-table-heading heading="Name" name="name" sortable/>
    <cv-data-table-heading heading="Year" name="year" sortable/>
    <cv-data-table-heading heading="Object Oriented"/>
    <cv-data-table-heading heading="Purpose" />
    <cv-data-table-heading heading="Standard" />
  `,
};

const dataSlot = {
  components: { CvDataTableRow, CvDataTableCell },
  template: `
    <cv-data-table-row v-for="row in theData" :key="row.name" :value="row.name">
      <cv-data-table-cell>{{row.name}}</cv-data-table-cell>
      <cv-data-table-cell>{{row.year}}</cv-data-table-cell>
      <cv-data-table-cell>{{row.oo}}</cv-data-table-cell>
      <cv-data-table-cell>{{row.purpose}}</cv-data-table-cell>
      <cv-data-table-cell>{{row.standard}}</cv-data-table-cell>
    </cv-data-table-row>
  `,
  data: function () {
    return {
      theData: testData,
    };
  },
};

describe('CvDataTable', () => {
  it('CvDataTable - test default and attrs', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvDataTable, {
      props: {
        // prettier-ignore
        columns: ['Name', 'Protocol', 'Port', 'Rule', 'Attached Groups', 'Status',],
        // prettier-ignore
        data: [
          ['Load Balancer 11', 'HTTP', '80', 'Round Robin', 'Maureen’s VM Groups', 'Active',],
          ['Load Balancer 4', 'HTTP', '81', 'Round Robin', 'Maureen’s VM Groups', 'Active',],
          ['Load Balancer 2', 'HTTP', '82', 'Round Robin', 'Maureen’s VM Groups', 'Active',],
        ],
      },
      slots: {},
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const table = result.container.querySelector('.cv-data-table');
    expect(table.classList.contains('ABC-class-123')).toBe(true);
    expect(table.getAttribute('aria-label')).toBe(ariaLabel);
    await result.findByText('Attached Groups');
    const rows = result.container.querySelectorAll('.cv-data-table-row');
    expect(rows.length).toBe(3);
  });

  it('CvDataTable - all props', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvDataTable, {
      props: {
        // prettier-ignore
        columns: ['Name', 'Protocol', 'Port', 'Rule', 'Attached Groups', 'Status',],
        // prettier-ignore
        data: [
          ['Load Balancer 11', 'HTTP', '80', 'Round Robin', 'War Eagle', 'Active',],
          ['Load Balancer 4', 'HTTP', '81', 'Round Robin', 'Go Dawgs', 'Active',],
          ['Load Balancer 2', 'HTTP', '82', 'Round Robin', 'Together We Swarm', 'Active',],
        ],
      },
      slots: {},
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    const table = result.container.querySelector('.cv-data-table');
    expect(table.classList.contains('ABC-class-123')).toBe(true);
    expect(table.getAttribute('aria-label')).toBe(ariaLabel);
    await result.findByText('War Eagle');
    const rows = result.container.querySelectorAll('.cv-data-table-row');
    expect(rows.length).toBe(3);

    // autoWidth
    expect(table.style.display).toBe('');
    await result.rerender({ autoWidth: true });
    expect(table.style.display).toBe('inline-block');

    // staticWidth
    const tableContainer = table.querySelector('.bx--data-table-container');
    expect(
      !tableContainer.classList.contains('bx--data-table-container--static')
    );
    expect(tableContainer.classList.contains('bx--data-table--max-width'));
    await result.rerender({ autoWidth: false, staticWidth: true });
    expect(
      tableContainer.classList.contains('bx--data-table-container--static')
    );
    expect(!tableContainer.classList.contains('bx--data-table--max-width'));
    expect(tableContainer.classList.contains('bx--data-table--static'));

    // rowSize
    expect(tableContainer.classList.contains('bx--data-table--lg'));
    await result.rerender({ staticWidth: false, rowSize: 'sm' });
    expect(tableContainer.classList.contains('bx--data-table--sm'));

    // zebra
    expect(!tableContainer.classList.contains('bx--data-table--zebra'));
    await result.rerender({ zebra: true });
    expect(tableContainer.classList.contains('bx--data-table--zebra'));

    // stickyHeader
    expect(!tableContainer.classList.contains('bx--data-table--sticky-header'));
    await result.rerender({ stickyHeader: true });
    expect(tableContainer.classList.contains('bx--data-table--sticky-header'));

    // borderless
    expect(!tableContainer.classList.contains('bx--data-table--no-border'));
    await result.rerender({ stickyHeader: false, borderless: true });
    expect(tableContainer.classList.contains('bx--data-table--no-border'));

    // sortable
    expect(!tableContainer.classList.contains('bx--data-table--sort'));
    await result.rerender({ sortable: true });
    expect(tableContainer.classList.contains('bx--data-table--sort'));

    // title
    await result.rerender({ title: 'ABC-title-123' });
    await result.findByText('ABC-title-123');

    // helperText
    await result.rerender({
      title: undefined,
      helperText: 'ABC-helper-text-123',
    });
    await result.findByText('ABC-helper-text-123');
  });

  it('CvDataTable - search', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const searchLabel = 'ABC-search-label-123';
    const searchPlaceholder = 'ABC-search-placeholder-123';
    const searchClearLabel = 'ABC-search-clear-label-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvDataTable, {
      props: {
        // prettier-ignore
        columns: ['Name', 'Protocol', 'Port', 'Rule', 'Atlanta', 'Georgia',],
        // prettier-ignore
        data: [
          ['Load Balancer 11', 'HTTP', '80', 'Round Robin', 'Maureen’s VM Groups', 'Active',],
          ['Load Balancer 4', 'HTTP', '81', 'Round Robin', 'Maureen’s VM Groups', 'Active',],
          ['Load Balancer 2', 'HTTP', '82', 'Round Robin', 'Maureen’s VM Groups', 'Active',],
        ],
        searchLabel,
        searchPlaceholder,
        searchClearLabel,
      },
      slots: {},
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
        onSearch: jest.fn(),
      },
    });

    const table = result.container.querySelector('.cv-data-table');
    expect(table.classList.contains('ABC-class-123')).toBe(true);
    expect(table.getAttribute('aria-label')).toBe(ariaLabel);
    await result.findByText('Atlanta');
    const rows = result.container.querySelectorAll('.cv-data-table-row');
    expect(rows.length).toBe(3);

    const search = await result.findByRole('search');
    expect(
      search.classList.contains('bx--toolbar-search-container-expandable')
    );
    await result.findByLabelText(searchLabel);
    await result.findByLabelText(searchClearLabel);
    await result.findByPlaceholderText(searchPlaceholder);

    await result.rerender({ expandingSearch: false });
    expect(
      !search.classList.contains('bx--toolbar-search-container-expandable')
    );
    expect(
      search.classList.contains('bx--toolbar-search-container-persistent')
    );

    const initialSearchValue = 'ABC-initial-search-value-123';
    await result.rerender({ expandingSearch: true, initialSearchValue });
    expect(search.classList.contains('bx--toolbar-search-container-active'));
  });

  it('CvDataTable - slots', async () => {
    // The render method returns a collection of utilities to query your component.
    const result = render(CvDataTable, {
      props: {
        rowsSelected: ['Java'],
      },
      slots: {
        data: dataSlot,
        headings: headingsSlot,
        actions: actionsSlot,
        'batch-actions': batchActionsSlot,
      },
      attrs: {},
    });

    await result.findByText('Object Oriented'); // heading
    await result.findByText('Business applications'); //data

    const table = result.container.querySelector('.cv-data-table');

    const actionButtons = table.querySelectorAll('.bx--toolbar-action');
    expect(actionButtons.length).toBe(1);

    const batchActions = table.querySelector('.bx--batch-actions');
    expect(batchActions.classList.contains('bx--batch-actions--active'));
    await result.rerender({ rowsSelected: [] });
    expect(!batchActions.classList.contains('bx--batch-actions--active'));

    const rows = result.container.querySelectorAll('.cv-data-table-row');
    expect(rows.length).toBe(8);
  });

  it('CvDataTable - skeleton', async () => {
    const ariaLabel = 'ABC-aria-label-123';
    const title = 'ABC-title-123';
    const helperText = 'ABC-helper-text-123';
    // The render method returns a collection of utilities to query your component.
    const result = render(CvDataTableSkeleton, {
      props: {
        columns: 7,
        rows: 5,
        title,
        helperText,
      },
      slots: {},
      attrs: {
        class: 'ABC-class-123',
        'aria-label': ariaLabel,
      },
    });

    await result.findByText(title);
    await result.findByText(helperText);
    const table = result.container.querySelector('.cv-data-table');
    expect(table.classList.contains('ABC-class-123')).toBe(true);
    expect(table.getAttribute('aria-label')).toBe(ariaLabel);
    let cols = table.querySelectorAll('.bx--table-header-label');
    expect(cols.length).toBe(7);
    let rows = table.querySelectorAll('.cv-data-table-row');
    expect(rows.length).toBe(5);
    await result.rerender({ columns: 3, rows: 9 });
    cols = table.querySelectorAll('.bx--table-header-label');
    expect(cols.length).toBe(3);
    rows = table.querySelectorAll('.cv-data-table-row');
    expect(rows.length).toBe(9);
  });
});
