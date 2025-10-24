import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

/**
 * Hook that gives you access to the judge's asked question from Redux,
 * and a setter to update or clear it.
 */
const useJudgeAskedQuestion = () => {
    const dispatch = useDispatch();
    const question = useSelector((state) => state.players.judgeQuestion);
    console.log('Redux question from selector:', question);

    const setAskedQuestion = useCallback(
        (value) => {
            console.log('Setting asked question:', value);
            dispatch({
                type: 'GET_JUDGE_QUESTION',
                payload: value,
            });
        },
        [dispatch]
    );
    return [question, setAskedQuestion];
};

export default useJudgeAskedQuestion;
