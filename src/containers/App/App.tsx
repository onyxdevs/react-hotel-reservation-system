import React, { useEffect } from 'react';
import { ConnectedProps } from 'react-redux';

import withErrorHandler from 'hocs/withErrorHandler';
import connector from './connector';
import { CircularProgress, Header, Steps, StepsIndicator } from 'components';
import { HotelDate, PreviewPayment, RoomView, Finish } from 'containers/Steps';
import { useSteps } from 'hooks';

import iconCalendar from 'lib/media/icons/calendar.svg';
import iconBed from 'lib/media/icons/bed.svg';
import iconCreditCard from 'lib/media/icons/credit-card.svg';

type TypeAppReduxProps = ConnectedProps<typeof connector>;

const App: React.FC<TypeAppReduxProps> = (props: TypeAppReduxProps) => {
    const { stepsState, stepChangeHandler } = useSteps();

    const { onInitReservationForm, data, status, error } = props;

    useEffect(() => {
        if (data.names && !data.names.length && !error) {
            onInitReservationForm();
        }
    }, [onInitReservationForm, data, error]);

    const renderStep = () => {
        console.log('stepsState', stepsState);
        if (stepsState.currentStep === 0) {
            return <HotelDate stepChangeHandler={stepChangeHandler} />;
        }
        if (stepsState.currentStep === 1) {
            return <RoomView stepChangeHandler={stepChangeHandler} />;
        }
        if (stepsState.currentStep === 2) {
            return <PreviewPayment stepChangeHandler={stepChangeHandler} />;
        }
        if (stepsState.currentStep === 3) {
            return <Finish stepChangeHandler={stepChangeHandler} />;
        }
    };

    return (
        <>
            <Header activeStep={stepsState.currentStep} stepChangeHandler={stepChangeHandler} />
            <main className={'container'}>
                <Steps>
                    <StepsIndicator
                        imgUrl={iconCalendar}
                        title="Hotel &amp; Date"
                        index={0}
                        stepChangeHandler={stepChangeHandler}
                    />
                    <StepsIndicator
                        imgUrl={iconBed}
                        title="Room type &amp; View"
                        index={1}
                        stepChangeHandler={stepChangeHandler}
                    />
                    <StepsIndicator
                        imgUrl={iconCreditCard}
                        title="Preview &amp; Payment"
                        index={2}
                        stepChangeHandler={stepChangeHandler}
                    />
                </Steps>
                {status === 'pending' && <CircularProgress />}
                {status === 'resolved' && renderStep()}
                {status === 'rejected' && error && <h3 style={{ textAlign: 'center', color: 'red' }}>{error}</h3>}
            </main>
        </>
    );
};

export default withErrorHandler(connector(App));
