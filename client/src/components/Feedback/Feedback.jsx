import styles from './feedback.module.css'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createFeedback } from '../../api/feedback';
import toast from 'react-hot-toast';

const Feedback = ({setShowFeedback}) => {

    const feedbackSchema = Yup.object().shape({
        feedbackType: Yup.string()
            .required('* Feedback type is required'),
        feedbackText: Yup.string()
            .required('* Feedback text is required')
            .min(10, 'Text must be 10 characters long')
            .max(200, 'Must be less than 200 characters long'),
    });

    const handleFormSubmit = async (values) => {
        try {
            const res = await createFeedback({ feedbackType: values.feedbackType, feedbackText: values.feedbackText });
            setShowFeedback(false)
            toast.success("Feedback Submitted")
        } catch (error) {
            toast.error("Feedback not submitted")
        }
    }

    return (
        <Formik
            initialValues={{ feedbackType: "", feedbackText: "" }}
            validationSchema={feedbackSchema}
            onSubmit={(value, { resetForm }) => handleFormSubmit(value, { resetForm })}
        >
            {(formik) => (
                <div className={styles.container}>
                    <label>Type of Feedback</label>
                    <select id="feedbackType" className={formik.errors.feedbackType ? ` ${styles.feedback_type} ${styles.form_error}` : styles.feedback_type} value={formik.values.feedbackType} onChange={formik.handleChange}>
                        <option  defaultChecked hidden>Feedback Type</option>
                        <option value="Bugs">Bugs</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Query">Query</option>

                    </select>
                    {formik.errors.feedbackType && <p className={styles.error_para}>{formik.errors.feedbackType}</p>}

                    <label>Feedback</label>
                    <textarea id="feedbackText" className={formik.errors.feedbackType ? ` ${styles.feedback_area} ${styles.form_error}` : styles.feedback_area} value={formik.values.feedbackText} onChange={formik.handleChange}></textarea>
                    {formik.errors.feedbackText && <p className={styles.error_para}>{formik.errors.feedbackText}</p>}

                    <button type='button' className={styles.submit_button} onClick={formik.handleSubmit}>Submit</button>
                </div>)}
        </Formik>
    )
}

export default Feedback