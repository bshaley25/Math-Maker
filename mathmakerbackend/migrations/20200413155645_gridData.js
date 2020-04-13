
exports.up = function(knex) {
    return knex.schema.createTable('gridData', gridData => {
        gridData.increments()
        gridData.integer('user_id').references('id').inTable('user')
        gridData.text('data')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('gridData')
};
