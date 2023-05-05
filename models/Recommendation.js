const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true
        },
        recommendationMessage: {
            type: String,
            required: true
        },
        onShowcase: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Recommendation = mongoose.model('recommendations', RecommendationSchema);
module.exports = Recommendation;