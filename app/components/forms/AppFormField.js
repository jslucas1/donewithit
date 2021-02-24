import React from 'react';
import { StyleSheet } from 'react-native';
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';
import {useFormikContext} from 'formik';

function AppFormField({name, ...otherProps}) {
    const {setFieldTouched, handleChange, errors, touched} = useFormikContext();
    return (
        <>
            <AppTextInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

const styles = StyleSheet.create({
    
})

export default AppFormField;