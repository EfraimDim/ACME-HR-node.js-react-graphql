const { Title } = require("../../../models/modelRelations");

module.exports.addNewTitle = async (title) => {
  try {
    await Title.create({ emp_no: "35128", title: title, from_date: "2000-01-01", to_date: "2000-01-02" });
  } catch (e) {
    console.log(e);
  }
};
