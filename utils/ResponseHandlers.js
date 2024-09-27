

// function to handle the any response

function response(res, status,message,data){
      return res.status(status).json({
            status,
            message,
            data
      })
}
module.exports = response;