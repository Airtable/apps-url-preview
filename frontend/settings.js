import {useBase, useGlobalConfig} from '@airtable/blocks/ui';

export const ConfigKeys = {
    IS_ENFORCED: 'isEnforced',
    TABLE_ID: 'tableId',
    URL_FIELD_ID: 'urlFieldId',
};

export const IsEnforced = Object.freeze({
    YES: true,
    NO: false,
});

const defaults = Object.freeze({
    [ConfigKeys.IS_ENFORCED]: IsEnforced.YES,
});

const hasOwn = (O, p) => Object.prototype.hasOwnProperty.call(O, p);
/**
 * Reads the values stored in GlobalConfig and inserts defaults for missing values
 * @param {GlobalConfig} globalConfig
 * @returns {{
 *     isEnforced?: true,
 *     table: Table | null,
 *     urlField: Field | null,
 * }}
 */
function getSettingsWithResolvedDefaults(globalConfig) {
    return Object.values(ConfigKeys).reduce((accum, configKey) => {
        const value = globalConfig.get(configKey);
        accum[configKey] =
            value === undefined && hasOwn(defaults, configKey) ? defaults[configKey] : value;
        return accum;
    }, {});
}
/**
 * Return settings from GlobalConfig with defaults, and converts them to Airtable objects.
 * @param {object} settings
 * @param {Base} base - The base being used by the block in order to convert id's to objects
 * @returns {{
 *     isEnforced: true | false,
 *     table: Table | null,
 *     urlField: Field | null,
 * }}
 */
function getSettings(settings, base) {
    const {isEnforced, tableId, urlFieldId} = settings;
    const table = base.getTableByIdIfExists(tableId);
    const urlField = table ? table.getFieldByIdIfExists(urlFieldId) : null;
    return {
        isEnforced,
        table,
        urlField,
    };
}

/**
 * Wraps the settings with validation information
 * @param {object} settings - The object returned by getSettings
 * @returns {{settings: *, isValid: boolean}|{settings: *, isValid: boolean, message: string}}
 */
function getSettingsValidationResult(settings) {
    const {isEnforced, table, urlField} = settings;
    // If a table was selected and the enforcement option is set to "Yes", but
    //  but no field and the option to
    if (table && isEnforced && !urlField) {
        return {
            isValid: false,
            message: 'Please select a URL Field for previews',
            settings,
        };
    }
    return {
        isValid: true,
        settings,
    };
}

/**
 * A React hook to validate and access settings configured in SettingsForm.
 * @returns {{settings: *, isValid: boolean, message: string}|{settings: *, isValid: boolean}}
 */
export function useSettings() {
    return getSettingsValidationResult(
        getSettings(getSettingsWithResolvedDefaults(useGlobalConfig()), useBase()),
    );
}
