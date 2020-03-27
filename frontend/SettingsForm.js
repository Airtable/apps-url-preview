import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {FieldType, Table} from '@airtable/blocks/models';
import {
    Box,
    Button,
    FieldPickerSynced,
    FormField,
    Heading,
    TablePickerSynced,
} from '@airtable/blocks/ui';

import {ConfigKeys} from './settings';

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
                            label="URL field"
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
        table: PropTypes.instanceOf(Table),
    }).isRequired,
};

export default SettingsForm;
