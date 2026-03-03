import { NextRequest } from "next/server";
import { getUserInfo } from "@/helpers/getUserInfo";
import { Address } from "@/models/address.model.js";

const addAddress = async (req: NextRequest, payload: {
    fullName: string,
    phone: string,
    street: string,
    city: string,
    state: string,
    country: string,
    pincode: string,
}) => {
    try {
        const user = await getUserInfo(req);
        if(!user) throw new Error("User not found");
        if(!payload.fullName || !payload.phone || !payload.street || !payload.city || !payload.state || !payload.country || !payload.pincode){
            throw new Error("All fields are required");
        };

        const addressCount = await Address.countDocuments({user: user._id});
        if(addressCount >= 5) throw new Error("Maximum address limit reached");

        const address = await Address.create({
            user: user._id,
            fullName: payload.fullName,
            phone: payload.phone,
            street: payload.street,
            city: payload.city,
            state: payload.state,
            country: payload.country,
            pincode: payload.pincode,
            isDefault: addressCount === 0
        });
        if(!address) throw new Error("Error occured while adding address");
        return address;
    } catch (error: any) {
        throw new Error(error.message)
    }
};

const editAddress = async (req: NextRequest, payload: {
    fullName: string,
    phone: string,
    street: string,
    city: string,
    state: string,
    country: string,
    pincode: string,
    addressId: string,
    isDefault: boolean
}) => {
    try {
        const user = await getUserInfo(req);
        if(!user) throw new Error("User does not exist");
        if(!payload.fullName && !payload.phone && !payload.street && !payload.city && !payload.state && !payload.country && !payload.pincode){
            throw new Error("Atleast one field is required");
        };
        const updateData: any = {};
        if(payload.fullName) updateData.fullName = payload.fullName;
        if(payload.phone) updateData.phone = payload.phone;
        if(payload.street) updateData.street = payload.street;
        if(payload.city) updateData.city = payload.city;
        if(payload.state) updateData.state = payload.state;
        if(payload.country) updateData.country = payload.country;
        if(payload.pincode) updateData.pincode = payload.pincode;
        if(payload.isDefault) updateData.isDefault = payload.isDefault;

        const address = await Address.findOneAndUpdate(
            {
                _id: payload.addressId,
                user: user._id
            },
            updateData,
            {
                new: true
            }
        );

        if(!address) throw new Error("Couldn't update address");
        return address;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const removeAddress = async (req:NextRequest, payload: {addressId: string}) => {
    try {
        const user = await getUserInfo(req);
        if(!user) throw new Error("User does not exist");
        const address = await Address.findOneAndDelete({_id: payload.addressId, user: user._id});
        if(!address) throw new Error("Couldn't delete address");
        return true;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const getAddresses = async (req:NextRequest) => {
    try {
        const user = await getUserInfo(req);
        if(!user) throw new Error("User not found");

        const addresses = await Address.find({user: user._id});
        return addresses;
    } catch (error: any) {
        throw new Error(error.message)
    }
};

const getAddress = async (req:NextRequest, payload: {addressId: string}) => {
    try {
        const user = await getUserInfo(req);
        if(!user) throw new Error("User not found");

        const address = await Address.findOne({_id: payload.addressId, user: user._id});
        if(!address) throw new Error("No address found");
        return address;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export {
    addAddress,
    editAddress,
    removeAddress,
    getAddresses,
    getAddress
};