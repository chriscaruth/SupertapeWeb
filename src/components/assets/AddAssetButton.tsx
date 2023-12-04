import { SubmitHandler, useForm, Controller } from "react-hook-form"
import { toast } from 'react-toastify';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalHeader, ModalBody, Select, SelectItem, ModalFooter, Button, Input, useDisclosure, Modal, ModalContent } from "@nextui-org/react";
import { Asset } from "../../models/Asset"
import { useServices } from "../../context/ServiceContext";
import { AssetStatus } from "../../models/enums/AssetStatus";
import { AssetType } from "../../models/enums/AssetType";

export const AddAssetButton = () => {
    const { assetService } = useServices();
    const mutation = assetService.addAssetMutation;
    const { control, handleSubmit, reset, formState: { errors } } = useForm<Asset>();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const onSubmit: SubmitHandler<Asset> = (data) => {
        mutation.mutate(data, {
            onSuccess: () => {
                toast.success("Asset added successfully");
                reset({});
                onClose();
            },
            onError: () => {
                toast.error("Unable to create new Asset")
            }
        });
    }

    return (
        <>
            <Button onPress={onOpen} color="primary" endContent={<FontAwesomeIcon icon={faPlus} />}>
                Add New
            </Button>
            <Modal
                size="3xl"
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalHeader className="flex flex-col gap-1">New Asset</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-6 gap-x-4">
                                    <div className="col-span-4">
                                        <Controller
                                            name="streetAddress"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) =>
                                                <Input
                                                    {...field}
                                                    isInvalid={!!errors.streetAddress}
                                                    variant="bordered"
                                                    label="Address"
                                                    placeholder="Enter Address"
                                                    errorMessage={errors.streetAddress ? "Address is required" : ""}
                                                />
                                            }
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <Controller
                                            name="unit"
                                            control={control}
                                            render={({ field }) =>
                                                <Input
                                                    {...field}
                                                    variant="bordered"
                                                    label="Unit"
                                                    placeholder="Enter unit"
                                                />
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-x-4 mb-4">
                                    <div className="col-span-2">
                                        <Controller
                                            name="city"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) =>
                                                <Input
                                                    {...field}
                                                    isInvalid={!!errors.city}
                                                    variant="bordered"
                                                    label="City"
                                                    placeholder="Enter City"
                                                    errorMessage={errors.streetAddress ? "City is required" : ""}
                                                />
                                            }
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <Controller
                                            name="state"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) =>
                                                <Input
                                                    {...field}
                                                    isInvalid={!!errors.state}
                                                    variant="bordered"
                                                    label="State"
                                                    placeholder="Enter State"
                                                    errorMessage={errors.streetAddress ? "State is required" : ""}
                                                />
                                            }
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <Controller
                                            name="zipCode"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) =>
                                                <Input
                                                    {...field}
                                                    isInvalid={!!errors.zipCode}
                                                    variant="bordered"
                                                    label="Zipcode"
                                                    placeholder="Zipcode Address"
                                                    errorMessage={errors.streetAddress ? "Zipcode is required" : ""}
                                                />
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-x-4 mb-4">
                                    <div className="col-span-3">
                                        <Controller
                                            name="status"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) =>
                                                <Select
                                                    {...field}
                                                    variant="bordered"
                                                    label="Occupancy"
                                                    placeholder="Select status"
                                                    isInvalid={!!errors.assetType}
                                                    errorMessage={errors.assetType ? "Occupancy is required" : ""}
                                                >
                                                    {Object.values(AssetStatus).map(x =>
                                                        <SelectItem key={x} value={x}>
                                                            {x}
                                                        </SelectItem>
                                                    )}
                                                </Select>
                                            }
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <Controller
                                            name="assetType"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) =>
                                                <Select
                                                    {...field}
                                                    variant="bordered"
                                                    label="Asset Type"
                                                    placeholder="Select type"
                                                    isInvalid={!!errors.assetType}
                                                    errorMessage={errors.assetType ? "Occupancy is required" : ""}
                                                >
                                                    {Object.values(AssetType).map(x =>
                                                        <SelectItem key={x} value={x}>
                                                            {x}
                                                        </SelectItem>
                                                    )}
                                                </Select>
                                            }
                                        />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={() => { reset({}); onClose(); }}>
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary" endContent={<FontAwesomeIcon icon={faPlus} />}>
                                    Add
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}