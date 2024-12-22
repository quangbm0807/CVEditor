import { Input } from "../shared/Input";
import { ImageUploader } from "./ImageUploader";

export const CVForm = ({ data, onChange }) => {
    const handleChange = (field, value) => {
        onChange({
            ...data,
            personalInfo: {
                ...data.personalInfo,
                [field]: value
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Thông tin cá nhân</h2>
                <div className="space-y-4">
                    <ImageUploader
                        value={data.personalInfo.profileImage}
                        onChange={(value) => handleChange('profileImage', value)}
                    />
                    <Input
                        label="Họ và tên"
                        value={data.personalInfo.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                    />
                    <Input
                        label="Chức danh"
                        value={data.personalInfo.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={data.personalInfo.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                    <Input
                        label="Số điện thoại"
                        value={data.personalInfo.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                    />
                    <Input
                        label="Địa chỉ"
                        value={data.personalInfo.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};