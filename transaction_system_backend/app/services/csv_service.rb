require "csv"

class CsvService
  CSV_PATH = Rails.root.join("data", "transactions.csv")

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
      csv << [
        row[:transactionDate],
        row[:accountNumber],
        row[:accountHolderName],
        row[:amount],
        row[:status]
      ]
    end
  end
end
