export default (sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {
        ack_id	: DataTypes.STRING,
        name: DataTypes.STRING,
        application_date: DataTypes.STRING,
        application_type	: DataTypes.STRING,
        name	: DataTypes.STRING,
        amount	: DataTypes.STRING,
        address	: DataTypes.STRING,
        phone	: {type: DataTypes.STRING, unique: true},
        other_info: DataTypes.STRING,	
        info: DataTypes.STRING,
        tp_no: DataTypes.STRING,	
        image_id: DataTypes.STRING,
        plot_no	: {type: DataTypes.STRING, unique: true},
        amount_paid: DataTypes.STRING,	
        reciept_no	: DataTypes.STRING,
        stage	: DataTypes.INTEGER,
        status: DataTypes.STRING,
        forward_to: DataTypes.STRING,	
        email	: {type: DataTypes.STRING, unique: true},
        commissioning: DataTypes.STRING,	
        forward_by: DataTypes.STRING,
    });

    return Application;
};