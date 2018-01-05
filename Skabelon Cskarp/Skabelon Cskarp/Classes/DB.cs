using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Skabelon_Cskarp.Classes
{
    public class DB
    {
        private static SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["connectToDb"].ConnectionString);
        public static void OpenDb() // Lavet af Lasse
        {
            try
            {
                connection.Open();
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        public static void CloseDb() // Lavet af Lasse
        {
            try
            {
                connection.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private static SqlParameter CreateParam(string name, object value, SqlDbType type)
        {
            SqlParameter param = new SqlParameter(name, type);
            param.Value = value;
            return param;
        }
    }
}