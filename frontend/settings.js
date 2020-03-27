import {useBase, useGlobalConfig} from '@airtable/blocks/ui';

export const ConfigKeys = Object.freeze({
    TABLE_ID: 'tableId',
    URL_FIELD_ID: 'urlFieldId',
});

/**
 * Reads values from GlobalConfig and converts them to Airtable objects.
 * @param {GlobalConfig} globalConfig
 * @param {Base} base - The base being used by the block in order to convert id's to objects
 * @returns {{
 *     table: Table | null,
 *     urlField: Field | null,
 * }}
 */
function getSettings(globalConfig, base) {
    const table = base.getTableByIdIfExists(globalConfig.get(ConfigKeys.TABLE_ID));
    const urlField = table
        ? table.getFieldByIdIfExists(globalConfig.get(ConfigKeys.URL_FIELD_ID))
        : null;
    return {
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
    const {table, urlField} = settings;
    if (!table || !urlField) {
        return {
            isValid: false,
            message: 'Pick a table and url field',
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
    const base = useBase();
    const globalConfig = useGlobalConfig();
    const settings = getSettings(globalConfig, base);
    return getSettingsValidationResult(settings);
}
