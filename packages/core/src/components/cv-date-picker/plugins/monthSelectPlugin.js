/*
 * COPIED FROM carbon-components-react
 */

/**
 * @param {number} monthNumber The month number.
 * @param {boolean} shorthand `true` to use shorthand month.
 * @param {Locale} locale The Flatpickr locale data.
 * @returns {string} The month string.
 */
const monthToStr = (monthNumber, shorthand, locale) => locale.months[shorthand ? 'shorthand' : 'longhand'][monthNumber];

/**
 * @param {object} config Plugin configuration.
 * @param {boolean} [config.shorthand] `true` to use shorthand month.
 * @param {string} config.selectorFlatpickrMonthYearContainer The CSS selector for the container of month/year selection UI.
 * @param {string} config.selectorFlatpickrYearContainer The CSS selector for the container of year selection UI.
 * @param {string} config.selectorFlatpickrCurrentMonth The CSS selector for the text-based month selection UI.
 * @param {string} config.classFlatpickrCurrentMonth The CSS class for the text-based month selection UI.
 * @returns {Plugin} A Flatpickr plugin to use text instead of `<select>` for month picker.
 */
export default config => fp => {
  const setupElements = () => {
    if (!fp.monthElements) {
      return;
    }
    fp.monthElements.forEach(elem => {
      if (!elem.parentNode) return;
      elem.parentNode.removeChild(elem);
    });
    fp.monthElements.splice(
      0,
      fp.monthElements.length,
      ...fp.monthElements.map(() => {
        // eslint-disable-next-line no-underscore-dangle
        const monthElement = fp._createElement('span', config.classFlatpickrCurrentMonth);
        monthElement.textContent = monthToStr(fp.currentMonth, config.shorthand === true, fp.l10n);
        fp.yearElements[0]
          .closest(config.selectorFlatpickrMonthYearContainer)
          .insertBefore(monthElement, fp.yearElements[0].closest(config.selectorFlatpickrYearContainer));
        return monthElement;
      })
    );
  };

  const updateCurrentMonth = () => {
    const monthStr = monthToStr(fp.currentMonth, config.shorthand === true, fp.l10n);
    fp.yearElements.forEach(elem => {
      const currentMonthContainer = elem.closest(config.selectorFlatpickrMonthYearContainer);
      Array.prototype.forEach.call(currentMonthContainer.querySelectorAll('.cur-month'), monthElement => {
        monthElement.textContent = monthStr;
      });
    });
  };

  const register = () => {
    fp.loadedPlugins.push('carbonFlatpickrMonthSelectPlugin');
  };

  return {
    onMonthChange: updateCurrentMonth,
    onValueUpdate: updateCurrentMonth,
    onOpen: updateCurrentMonth,
    onReady: [setupElements, updateCurrentMonth, register],
  };
};
