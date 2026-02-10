import { useLoaderData, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../../../Hooks/useAuth";
import Swal from "sweetalert2";

const ServiceDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
        const navigate = useNavigate()


    const modalRef = useRef();
    const [selectedService, setSelectedService] = useState(null);

    const {
        register,
        handleSubmit,

        control,
        formState: { errors },
    } = useForm();




    const serviceCenters = useLoaderData()
    const regionsDuplicate = serviceCenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]

    const userRegion = useWatch({ control, name: 'userRegion' })

    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region)
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }


    /* ================= FETCH SERVICE ================= */
    const { data: service = {}, isLoading } = useQuery({
        queryKey: ["service", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/service/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <span className="loading loading-spinner"></span>;
    }

    /* ================= MODAL HANDLERS ================= */
    const openModal = () => {
        setSelectedService(service);
        modalRef.current.showModal();
    };

    const handleBookService = (data) => {
        const bookingData = {
            ...data,
            serviceId: selectedService._id,
            serviceName: selectedService.serviceName,
            serviceCost: selectedService.serviceCost,
        };

       // console.log("Booking Data:", bookingData);

        axiosSecure.post('/booking', bookingData)
            .then(res => {
                console.log(res.bookingData)
                  navigate('/dashboard/my-bookings')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Submitted Booking.You will be notify soon",
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch(err=>{
                console.log(err)
            })
    };

    return (
        <div className="flex flex-col md:flex-row gap-10 max-w-7xl mx-auto my-5">

            {/* LEFT */}
            <div className="flex-1">
                <h1 className="text-2xl font-bold">
                    Transform Any Occasion Into an Unforgettable Experience
                </h1>

                <p className="text-gray-400 mb-5">
                    From intimate gatherings to grand celebrations, our professional
                    decoration services bring your vision to life beautifully and effortlessly.
                </p>

                <img
                    src={service.thumbnail}
                    alt={service.serviceName}
                    className="w-full h-80 object-cover rounded"
                />

                <button
                    onClick={openModal}
                    className="btn btn-secondary w-full mt-10 rounded-4xl"
                >
                    Book Now
                </button>
            </div>

            {/* RIGHT */}
            <div className="flex-1">
                <h1 className="text-3xl font-bold">{service.serviceName}</h1>
                <p className="text-xl text-gray-600 mt-2">
                    Cost: ${service.serviceCost}
                </p>
                <p className="mt-4">{service.serviceDescription}</p>
            </div>



            {/* ================= MODAL ================= */}
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">
                        Book: {selectedService?.serviceName}
                    </h3>

                    <form onSubmit={handleSubmit(handleBookService)} className="space-y-3">

                        {/* name */}
                        <label className="label">User name</label>
                        <input type="text" {...register('userName', { required: true })}
                            className="input w-full" placeholder="User Name" />
                        {
                            errors.userName?.type === 'required' && <p>User name is required</p>
                        }
                        {/* email */}
                        <label className="label">User emial</label>
                        <input type="email" className="input w-full"{...register('userEmail')} placeholder="User email" defaultValue={user?.email} />

                        {/* date */}


                        <label className="label">Date</label>
                        <input type="date" {...register('date', { required: true })}
                            className="input w-full" />
                        {
                            errors.date?.type === 'required' && <p>Booking date is required</p>
                        }


                        {/* region select */}
                        <fieldset className="fieldset">
                            <label className="label">User Region</label>
                            <select {...register('userRegion')} defaultValue="Pick a region" className="select w-full">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, index) => <option key={index} value={r}>{r}</option>
                                    )
                                }
                            </select>
                        </fieldset>

                        {/* district select */}
                        <fieldset className="fieldset">
                            <label className="label">User District</label>
                            <select {...register('userDistrict')} defaultValue="Pick a District" className="select w-full">
                                {/* <option disabled={true}>Pick a dis</option> */}
                                {
                                    districtsByRegion(userRegion).map((r, index) => <option key={index} value={r}>{r}</option>
                                    )
                                }
                            </select>
                        </fieldset>

                        <button className="btn btn-secondary w-full mt-4">
                            Confirm Booking
                        </button>
                    </form>

                    <form method="dialog" className="modal-action">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ServiceDetails;
