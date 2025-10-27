require "csv"

class CsvService
  CSV_PATH = Rails.root.join("data", "transactions.csv")
  HEADERS = ["Transaction Date", "Account Number", "Account Holder Name", "Amount", "Status"]

  def self.read_all
    CSV.read(CSV_PATH, headers: true).map(&:to_h).map do |tx|
      {
        transactionDate: tx["Transaction Date"],
        accountNumber: tx["Account Number"],
        accountHolderName: tx["Account Holder Name"],
        amount: tx["Amount"].to_f,
        status: tx["Status"]
      }
    end
  end

  def self.append(row)
    CSV.open(CSV_PATH, "a") do |csv|
      csv << HEADERS.map { |h| row[h] }
    end
  end
end