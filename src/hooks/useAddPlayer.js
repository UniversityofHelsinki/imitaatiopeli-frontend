import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { usePOST } from '../useHttp';

let message = '';

const useAddPlayer = (
) => {
    const [feedback, setFeedback] = useState(null);
    const post = usePOST({
        path: `/api/saveFeedback`,
        invalidates: [`COURSE_STATISTICS_OR_ASSIGNMENTS_${id}`],
    });
    useEffect(() => {
        if (feedback === null)
            setFeedback({ feedback_value: feedback_value, order_nbr: feedback_order_nbr });
    }, [feedback]); // re-run the effect when 'count' changes

    const dispatch = useDispatch();
    const storedFeedback = useSelector((state) => state.student.feedback);
    const addPlayer = async (userName, course_id, assignment_id, feedback_id) => {
        const response = await post({
            ...feedback,
            user_name: user.eppn,
            course_id: course_id,
            assignment_id: assignment_id,
            id: feedback_id,
            student: userName,
        });
        if (response.status === 200) {
            const data = await response.json();
            if (data.message) {
                message = data.message;
            } else {
                message = 'student_feedback_message';
            }
        } else if (response.status === 500) {
            message = 'student_feedback_err_message';
        }
        dispatch({ type: 'SET_STUDENT_FEEDBACK', payload: response });
    };

    return [ addPlayer, message ];
};

export default useAddPlayer;
