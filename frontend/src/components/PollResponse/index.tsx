import Loader from '@design/Loader';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { Poll } from '@services/polls';
import { getResult } from '@store/polls/actions';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import PollResultsRow from './PollResponseRow';

const classes = {
    card: 'bg-white rounded-lg p-5 pb-3 h-full flex flex-col justify-between',
    question: 'text-lg text-primary-dark leading-6 mb-4 block min-h-[48px]',
    responses: 'text-sm text-neutral-400 mt-2',
};

interface PollResultsProps {
    poll: Poll;
}

const PollResults = ({ poll }: PollResultsProps) => {
    const { t } = useTranslation();
    const dispatch = useThunkDispatch();
    const data = useSelector((state) =>
        state.polls.results.find((result) => result.pollId === poll.id)
    );

    useEffect(() => {
        dispatch(getResult(poll.id));
    }, []);

    return (
        <div className={classes.card}>
            {data ? (
                <>
                    <span className={classes.question}>{data.question}</span>
                    <div>
                        {data.responses.map((resp) => (
                            <PollResultsRow
                                key={resp.id}
                                className='mb-3'
                                label={resp.label}
                                value={(100 * resp.count) / data.total}
                            />
                        ))}
                    </div>
                    <span className={classes.responses}>
                        {data.responses.length} {t('poll_results_respondants')}
                    </span>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default PollResults;
