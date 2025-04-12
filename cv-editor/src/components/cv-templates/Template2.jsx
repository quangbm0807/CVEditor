import { renderSectionItem } from "./Template1";

export const Template2 = ({ data = {} }) => {
    const { personalInfo = {}, sections = [] } = data || {};

    // Separate sections into left and right columns
    const leftSections = sections.filter(section =>
        ['skills', 'languages', 'certifications'].includes(section.type)
    );

    const rightSections = sections.filter(section =>
        ['experience', 'education', 'projects', 'achievements'].includes(section.type)
    );

    return (
        <div className="cv-template-2 flex gap-8">
            {/* Left Column - 1/3 width */}
            <div className="w-1/3 bg-gray-50 p-6 rounded-lg">
                {/* Profile Image and Contact Info */}
                <div className="text-center mb-8">
                    {personalInfo.profileImage && (
                        <div className="mb-4">
                            <img
                                src={personalInfo.profileImage}
                                alt={personalInfo.fullName}
                                className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                            />
                        </div>
                    )}
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    {personalInfo.title && (
                        <p className="text-lg text-gray-600 mb-4">{personalInfo.title}</p>
                    )}
                    <div className="space-y-2 text-sm">
                        {personalInfo.email && (
                            <p className="flex items-center justify-center text-gray-600">
                                <span className="mr-2">📧</span> {personalInfo.email}
                            </p>
                        )}
                        {personalInfo.phone && (
                            <p className="flex items-center justify-center text-gray-600">
                                <span className="mr-2">📱</span> {personalInfo.phone}
                            </p>
                        )}
                        {personalInfo.address && (
                            <p className="flex items-center justify-center text-gray-600">
                                <span className="mr-2">📍</span> {personalInfo.address}
                            </p>
                        )}
                    </div>
                </div>

                {/* Left Column Sections */}
                {leftSections.map((section, index) => (
                    <div key={section.id || index} className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                            {section.title}
                        </h2>
                        <div className="space-y-3">
                            {section.items?.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                    {renderSectionItem(section.type, item)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Column - 2/3 width */}
            <div className="w-2/3">
                {rightSections.map((section, index) => (
                    <div key={section.id || index} className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                            {section.title}
                        </h2>
                        <div className="space-y-4">
                            {section.items?.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                    {renderSectionItem(section.type, item)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};