import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui';

const styles = () => ({
  container: {
    display: 'flex',
    // flexWrap: 'wrap',
  },
  textFieldRoot: {
    padding: 0,
  },
  textFieldInput: {
    borderRadius: 2,
    backgroundColor: '#fff',
    border: '1px solid #C7C7CD',
    width: '100%',
    padding: '1.3em',
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
  errorStyle: {
    color: 'red',
  },
});

// const renderField = ({
//   input,
//   label,
//   type,
//   meta: { touched, error, warning }
// }) => (
//     <div>
//       <label>{label}</label>
//       <div>
//         <input {...input} placeholder={label} type={type} />
//         {touched &&
//           ((error && <span>{error}</span>) ||
//             (warning && <span>{warning}</span>))}
//       </div>
//     </div>
//   )

const renderField = (props) => {
  const {
    label, name, type, input, placeholder, classes, Width, MaxWidth, meta: { touched, error, warning },
  } = props;
  // console.log(visited);
  return (
    <div className={classes.container}>
      <div style={{ width: Width || '100%', maxWidth: MaxWidth || '525px' }}>
        <TextField
          {...input}
          name={name}
          label={label}
          placeholder={placeholder}
          type={type}
          fullWidth
          required
        />
        {/* <div>
          {touched &&
            ((error && <span className={classes.errorStyle}>{`${error}*`}</span>) ||
              (warning && <span>{warning}</span>))}
        </div> */}
      </div>
    </div>
  );
};

renderField.propTypes = {
  name: PropTypes.any,
  input: PropTypes.any,
  label: PropTypes.any,
  type: PropTypes.any,
  placeholder: PropTypes.any,
  classes: PropTypes.object,
  Width: PropTypes.string,
  MaxWidth: PropTypes.string,
  meta: PropTypes.object,
};

export default withStyles(styles)(renderField);
