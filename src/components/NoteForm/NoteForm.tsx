import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import * as yup from 'yup';
import css from './NoteForm.module.css';
import type { NoteTag } from '../../types/note';

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteFormProps {
  onCancel: () => void;
  onSubmit: (values: NoteFormValues) => void;
  isSubmitting: boolean;
}

const schema = yup.object({
  title: yup.string().min(3).max(50).required('Title is required'),
  content: yup.string().max(500, 'Max 500 characters'),
  tag: yup
    .mixed<NoteTag>()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

export default function NoteForm({ onCancel, onSubmit, isSubmitting }: NoteFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <FormikError name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field id="content" as="textarea" name="content" rows={8} className={css.textarea} />
          <FormikError name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field id="tag" as="select" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <FormikError name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isSubmitting}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
