import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../store/themeConfigSlice';

const SweetAlert = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Sweet Alerts'));
    });
    const [codeArr, setCodeArr] = useState<string[]>([]);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const showAlert = async (type: number) => {
        if (type === 1) {
            Swal.fire({
                title: 'Saved successfully',
                padding: '2em',
                customClass: {
                    popup: 'sweet-alerts',
                },
            });
        } else if (type === 2) {
            Swal.fire({
                icon: 'success',
                title: 'Good job!',
                text: 'You clicked the button!',
                padding: '2em',
                customClass: {
                    popup: 'sweet-alerts',
                },
            });
        } else if (type === 3) {
            const ipAPI = 'https://api.ipify.org?format=json';
            Swal.fire({
                title: 'Your public IP',
                confirmButtonText: 'Show my public IP',
                text: 'Your public IP will be received via AJAX request',
                showLoaderOnConfirm: true,
                customClass: {
                    popup: 'sweet-alerts',
                },
                preConfirm: async () => {
                    try {
                        const response = await fetch(ipAPI);
                        const data = await response.json();
                        return data.ip;
                    } catch {
                        Swal.showValidationMessage('Failed to fetch IP');
                    }
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: result.value,
                        customClass: {
                            popup: 'sweet-alerts',
                        },
                    });
                }
            });
        } else if (type === 4) {
            Swal.fire({
                icon: 'question',
                title: 'The Internet?',
                text: 'That thing is still around?',
                padding: '2em',
                customClass: {
                    popup: 'sweet-alerts',
                },
            });
        } else if (type === 5) {
            const steps = ['1', '2', '3'];
            const swalQueueStep = Swal.mixin({
                confirmButtonText: 'Next →',
                showCancelButton: true,
                progressSteps: steps,
                input: 'text',
                padding: '2em',
                customClass: {
                    popup: 'sweet-alerts',
                },
            });
            const values: any[] = [];
            let currentStep;

            for (currentStep = 0; currentStep < steps.length; ) {
                const result = await swalQueueStep.fire({
                    title: `Question ${steps[currentStep]}`,
                    inputValue: values[currentStep],
                    currentProgressStep: currentStep,
                });

                if (result.value) {
                    values[currentStep] = result.value;
                    currentStep++;
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    currentStep--;
                } else {
                    break;
                }
            }

            if (currentStep === steps.length) {
                Swal.fire({
                    title: 'All done!',
                    padding: '2em',
                    html: `Your answers: <pre>${JSON.stringify(values)}</pre>`,
                    confirmButtonText: 'Lovely!',
                    customClass: {
                        popup: 'sweet-alerts',
                    },
                });
            }
        } else if (type === 6) {
            Swal.fire({
                title: 'Custom animation with Animate.css',
                showClass: {
                    popup: 'animate__animated animate__flip',
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp',
                },
                padding: '2em',
                customClass: {
                    popup: 'sweet-alerts',
                },
            });
        } else if (type === 7) {
            let timerInterval: NodeJS.Timer | undefined;
            Swal.fire({
                title: 'Auto close alert!',
                html: 'I will close in <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    const b = Swal.getHtmlContainer()?.querySelector('b') as HTMLElement | null;
                    if (b) {
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()?.toString() || '';
                        }, 100);
                    }
                },
                willClose: () => {
                    if (timerInterval) {
                        clearInterval(timerInterval);
                    }
                },
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer');
                }
            });
        } else if (type === 8) {
            Swal.fire({
                title: 'Sweet!',
                text: 'Modal with a custom image.',
                imageUrl: '/assets/images/custom-swal.svg',
                imageWidth: 224,
                imageHeight: 'auto',
                imageAlt: 'Custom image',
                padding: '2em',
                customClass: {
                    popup: 'sweet-alerts',
                },
            });
        }
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/components/sweetalert" className="text-primary hover:underline">
                        Components
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Sweet Alerts</span>
                </li>
            </ul>
            <div className="sweet-alerts space-y-8 pt-5">
                <button onClick={() => showAlert(1)} className="btn btn-primary">
                    Basic Alert
                </button>
                <button onClick={() => showAlert(2)} className="btn btn-secondary">
                    Success Alert
                </button>
                <button onClick={() => showAlert(3)} className="btn btn-success">
                    Ajax Alert
                </button>
                <button onClick={() => showAlert(4)} className="btn btn-warning">
                    Question Alert
                </button>
                <button onClick={() => showAlert(5)} className="btn btn-danger">
                    Step Alert
                </button>
            </div>
        </div>
    );
};

export default SweetAlert;
