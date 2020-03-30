import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Field, FieldType, Table} from '@airtable/blocks/models';
import {
    Box,
    Button,
    FieldPickerSynced,
    FormField,
    Heading,
    SelectButtonsSynced,
    TablePickerSynced,
} from '@airtable/blocks/ui';

import {ConfigKeys, IsEnforced} from './settings';

function SettingsForm({setIsSettingsVisible, settings}) {
    return (
        <Box
            flex="1 0 auto"
            display="flex"
            flexDirection="column"
            width="300px"
            backgroundColor="white"
            maxHeight="100vh"
        >
            <Box
                flex="auto"
                display="flex"
                flexDirection="column"
                minHeight="0"
                padding={3}
                overflowY="auto"
            >
                <Heading marginBottom={3}>Settings</Heading>
                <FormField label="Table">
                    <TablePickerSynced globalConfigKey={ConfigKeys.TABLE_ID} />
                </FormField>
                {settings.table && (
                    <Fragment>
                        <FormField
                            label="URL Field"
                            description="Must have field type: TEXT or URL"
                        >
                            <FieldPickerSynced
                                table={settings.table}
                                globalConfigKey={ConfigKeys.URL_FIELD_ID}
                                allowedTypes={[
                                    FieldType.SINGLE_LINE_TEXT,
                                    FieldType.TEXT,
                                    FieldType.URL,
                                ]}
                            />
                        </FormField>
                    </Fragment>
                )}
                <FormField
                    label="Enforce Table & URL Field Settings?"
                    description={`URL Previews will be shown for ${
                        settings.isEnforced === IsEnforced.YES
                            ? 'only the specified URL Field in the specified Table'
                            : 'all valid fields in all available tables'
                    }.`}
                >
                    <SelectButtonsSynced
                        options={[
                            {label: 'Yes', value: IsEnforced.YES},
                            {label: 'No', value: IsEnforced.NO},
                        ]}
                        globalConfigKey={ConfigKeys.IS_ENFORCED}
                    />
                </FormField>
            </Box>
            <Box
                flex="none"
                display="flex"
                justifyContent="flex-end"
                paddingY={3}
                marginX={3}
                borderTop="thick"
            >
                <Button variant="primary" onClick={() => setIsSettingsVisible(false)}>
                    Done
                </Button>
            </Box>
        </Box>
    );
}

SettingsForm.propTypes = {
    setIsSettingsVisible: PropTypes.func.isRequired,
    settings: PropTypes.shape({
        isEnforced: PropTypes.bool,
        table: PropTypes.instanceOf(Table),
        urlField: PropTypes.instanceOf(Field),
    }).isRequired,
};

export default SettingsForm;
